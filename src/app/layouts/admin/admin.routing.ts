import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('@routes/home/home.module').then(mod => mod.HomeModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('@routes/dashboard/dashboard.module').then(mod => mod.DashboardModule)
            },
            {
                path: 'report',
                loadChildren: () => import('@routes/report/report.module').then(mod => mod.ReportModule)
            },
            {
                path: 'chat',
                loadChildren: () => import('@routes/chat/chat.module').then(mod => mod.ChatModule)
            },
            {
                path: 'purchase',
                loadChildren: () => import('@routes/purchase/purchase.module').then(mod => mod.PurchaseModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class AdminRoutingComponent { }
