import Vue from 'vue';
import Router from "vue-router";
import PrivateEventList from "../components/private_events/PrivateEventList"
import AddEvent from "../components/private_events/AddEvent"
import UpdateEvent from "../components/private_events/UpdateEvent"
import EventDetail from "../components/private_events/EventDetail"

Vue.use(Router);
const routes = [
    {
    path: "/", component: PrivateEventList
    },
    {path: "/add-event", component: AddEvent},
    {path: "/update-event/:id", component: UpdateEvent},
    {path: "/event-detail/:id", component: EventDetail},
];
const router = new Router({
    routes,
    mode: "history"
});
export default router;