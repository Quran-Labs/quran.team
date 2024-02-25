import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeComponent } from './components/tree/tree.component';
import { OperationsPageComponent } from './pages/operations-page/operations-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/إسناد/القرآن', pathMatch: 'full' },
    { path: 'إسناد', component: TreeComponent },
    { path: 'إسناد/:id', component: TreeComponent },
    { path: 'كيف-يعمل', component: OperationsPageComponent },
    { path: 'اتصل-بنا', component: ContactPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
