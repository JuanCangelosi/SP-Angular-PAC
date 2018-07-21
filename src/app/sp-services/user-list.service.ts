import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor() { }

  public async getCurrentUser(): Promise<User> {
    const currentUser = await sp.web.currentUser.usingCaching().get();
    const user: User = new User();
    user.PrepareDTO(currentUser);
    return user;
  }

  public async isUserManager(id): Promise<boolean> {
    let isManager = true;
    const userExistingInGroup = await sp.web.siteGroups.getByName('PACManager').users.getById(id).get();
    if (!userExistingInGroup) {
      isManager = false;
    }
    return isManager;
  }

  public async getManagers(): Promise<User[]> {
    const managers: User[] = new Array<User>();
    const web = sp.web;
    const resJson = await web.siteGroups.getByName('PACManager').users.get();
    for (const item of resJson) {
      const manager: User = new User();
      manager.PrepareDTO(item);
      managers.push(manager);
    }
    return managers;
  }

  public async getUsers(): Promise<User[]> {
    const users: User[] = new Array<User>();
    const web = sp.web;
    const resJson = await web.siteUsers.get();
    for (const item of resJson) {
      const user: User = new User();
      user.PrepareDTO(item);
      users.push(user);
    }
    return users;
  }
}
