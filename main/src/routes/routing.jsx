/*--------------------------------------------------------------------------------*/
/*                                  starter                                    */
/*--------------------------------------------------------------------------------*/
import FirstDashboard from '../components/starter/starter.jsx';
/*--------------------------------------------------------------------------------*/
/*                           Ui-components Dropdown                               */
/*--------------------------------------------------------------------------------*/
import Alerts from '../components/ui-components/alert.jsx';
import Badges from '../components/ui-components/badge.jsx';
import Buttons from '../components/ui-components/button.jsx';
import Cards from '../components/ui-components/cards.jsx';
import FundsForm from '../components/helper/FundsForm.jsx';
import LayoutComponent from '../components/ui-components/layout.jsx';
import PaginationComponent from '../components/ui-components/pagination.jsx';
import PopoverComponent from '../components/ui-components/popover.jsx';
import TooltipComponent from '../components/ui-components/tooltip.jsx';
import Callback from '../components/auth/Callback.jsx';
// import SignIn from '../components/auth/SignIn';

var ThemeRoutes = [
  // {
  //   path: '/starter/starter',
  //   name: 'Dashboard',
  //   icon: 'mdi mdi-adjust',
  //   component: FirstDashboard,
  // },
  // {
  //   path: '/ui-components/alert',
  //   name: 'Alerts',
  //   icon: 'mdi mdi-comment-processing-outline',
  //   component: Alerts,
  // },
  // {
  //   path: '/ui-components/badge',
  //   name: 'Badges',
  //   icon: 'mdi mdi-arrange-send-backward',
  //   component: Badges,
  // },
  // {
  //   path: '/ui-components/button',
  //   name: 'Buttons',
  //   icon: 'mdi mdi-toggle-switch',
  //   component: Buttons,
  // },
  // {
  //   path: '/ui-components/card',
  //   name: 'Cards',
  //   icon: 'mdi mdi-credit-card-multiple',
  //   component: Cards,
  // },
  // {
  //   path: '/ui-components/layout',
  //   name: 'Layout',
  //   icon: 'mdi mdi-apps',
  //   component: LayoutComponent,
  // },
  // {
  //   path: '/ui-components/pagination',
  //   name: 'Pagination',
  //   icon: 'mdi mdi-priority-high',
  //   component: PaginationComponent,
  // },
  // {
  //   path: '/ui-components/popover',
  //   name: 'Popover',
  //   icon: 'mdi mdi-pencil-circle',
  //   component: PopoverComponent,
  // },
  // {
  //   path: '/ui-components/tooltip',
  //   name: 'Toltips',
  //   icon: 'mdi mdi-image-filter-vintage',
  //   component: TooltipComponent,
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   icon: 'mdi mdi-image-filter-vintage',
  //   component: SignIn,
  // },
  // {
  //   path: '/ui-components/FundsForm',
  //   name: 'Add...',
  //   icon: 'mdi mdi-image-filter-vintage',
  //   component: FundsForm,
  // },
  // {
  //   path: '/',
  //   pathTo: '/starter/starter',
  //   name: 'Dashboard',
  //   redirect: true,
  // },
  { path: '/', name: 'Callback', component: Callback },
];
export default ThemeRoutes;
