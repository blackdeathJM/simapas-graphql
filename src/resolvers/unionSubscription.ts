import {docExtSubscription} from "./presidencia/documentacion/docExt/docExt.subscription.resolver";
import {usuarioSubscriptionResolver} from "./usuarios/usuario.subscription.resolver";
import notSubscription from "./global/notificaciones/notificaciones.subscription.resolver";

export const unionSubscriptionResolver =
    [
        docExtSubscription,
        usuarioSubscriptionResolver,
        notSubscription
    ];
