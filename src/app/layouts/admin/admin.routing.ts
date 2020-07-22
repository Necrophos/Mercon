import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: () =>
      import("@routes/home/home.module").then((mod) => mod.HomeModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("@routes/dashboard/dashboard.module").then(
        (mod) => mod.DashboardModule
      ),
  },
  {
    path: "report",
    loadChildren: () =>
      import("@routes/report/report.module").then((mod) => mod.ReportModule),
  },
  {
    path: "chat",
    loadChildren: () =>
      import("@routes/chat/chat.module").then((mod) => mod.ChatModule),
  },
  {
    path: "purchase",
    loadChildren: () =>
      import("@routes/purchase/purchase.module").then(
        (mod) => mod.PurchaseModule
      ),
  },
  {
    path: "document",
    loadChildren: () =>
      import("@components/document/document.module").then(
        (mod) => mod.DocumentModule
      ),
  },
  {
    path: "about",
    loadChildren: () =>
      import("@routes/about/about.module").then((mod) => mod.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingComponent {}
