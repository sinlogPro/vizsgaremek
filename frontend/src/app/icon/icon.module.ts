import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from "angular-feather";
import { Home, Edit, Edit2, Edit3, Archive, Camera, ChevronLeft,
  Users, Truck,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  Minus

} from "angular-feather/icons";

const icons = {
  Home,
  Edit,
  Edit2,
  Edit3,
  Archive,
  Camera,
  ChevronLeft,
  Users,
  Truck,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Minus

}



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons),
  ],
  exports: [
    FeatherModule
  ]
})
export class IconModule { }
