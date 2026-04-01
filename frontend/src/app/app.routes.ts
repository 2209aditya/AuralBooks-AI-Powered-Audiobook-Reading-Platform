import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // 🔐 AUTH
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register.component')
        .then(m => m.RegisterComponent)
  },

  // 📊 DASHBOARD
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/publisher-dashboard/analytics.component')
        .then(m => m.AnalyticsComponent)
  },

  // 📖 READER
  {
    path: 'reader',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/reader/reader.routes')
        .then(m => m.readerRoutes)
  },

  // 🤖 AI
  {
    path: 'ai',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ai-assistant/ai-assistant.component')
        .then(m => m.AiAssistantComponent)
  },

  // 💬 GROUP CHAT
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/groups/group-chat.component')
        .then(m => m.GroupChatComponent)
  },

  // 🛒 MARKETPLACE
  {
    path: 'marketplace',
    loadComponent: () =>
      import('./features/marketplace/catalog.component')
        .then(m => m.CatalogComponent)
  },

  // 💳 CHECKOUT
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/marketplace/checkout.component')
        .then(m => m.CheckoutComponent)
  },

  // 🌍 DEFAULT
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];