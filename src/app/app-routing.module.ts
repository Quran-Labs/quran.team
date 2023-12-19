import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicPopoverComponent } from './demo-charts/basic-popover/basic-popover.component';

const routes: Routes = [
    { path: '', redirectTo: '/إسناد/القرآن', pathMatch: 'full' },
    { path: 'إسناد', component: BasicPopoverComponent },
    { path: 'إسناد/:id', component: BasicPopoverComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
