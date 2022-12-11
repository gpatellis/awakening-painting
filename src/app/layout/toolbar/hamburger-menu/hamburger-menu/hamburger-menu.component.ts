import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MENU_ITEMS } from "../../toolbar.templates";
import { menuItems } from "./hamurger-menu.constants";

@Component({
  selector: 'ap-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  menuItems: MENU_ITEMS[] = menuItems;
  
  constructor() { }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit(): void {
  }

}