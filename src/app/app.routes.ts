import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout/layout';
import { PropertyListComponent } from './components/properties/property-list-component/property-list-component';
import { PropertyComponent } from './components/properties/property-component/property-component';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                component: PropertyListComponent
            },
            {
                path: 'property/:id',
                component: PropertyComponent
            }
        ]
    },
];
