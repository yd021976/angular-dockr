import { Action } from '@ngrx/store';
import * as users_model from '../models/users.model';

export const USERS_GET_LIST = "[USERS] GET LIST";
export const USERS_GET_LIST_SUCCESS = "[USERS] GET LIST SUCCESS";
export const USERS_GET_LIST_ERROR = "[USERS] GET LIST ERROR";

export class getListUsers implements Action {
    readonly type = USERS_GET_LIST;
    constructor() { }
}
export class getListSuccessUsers implements Action {
    readonly type = USERS_GET_LIST_SUCCESS;
    constructor(public payload: users_model.IUsers[]) { }
}
export class getListErrorUsers implements Action {
    readonly type = USERS_GET_LIST_ERROR;
    constructor(public payload: string) { }
}


// export class selectTemplate implements Action {
//   readonly type = TEMPLATE_SELECT;
//   constructor(public payload: template_model.ITemplate) { }
// }

// export class selectZone implements Action {
//   readonly type = TEMPLATE_SELECT_ZONE;
//   constructor(public payload: zone_model.IZone) { }
// }

// export class addTemplate implements Action {
//   readonly type = TEMPLATE_ADD;
//   constructor(public payload: template_model.ITemplate) { }
// }
// export class addTemplateSuccess {
//   readonly type = TEMPLATE_ADD_SUCCESS;
//   constructor(public payload: template_model.ITemplate) { }
// }
// export class addTemplateError implements Action {
//   readonly type = TEMPLATE_ADD_ERROR;
//   constructor(public payload: string) { }
// }

// export class removeTemplate implements Action {
//   readonly type = TEMPLATE_REMOVE;
//   constructor(public payload: template_model.ITemplate) { }
// }
// export class removeTemplateSuccess implements Action {
//   readonly type = TEMPLATE_REMOVE_SUCCESS;
//   constructor(public payload: template_model.ITemplate) { }
// }
// export class removeTemplateError implements Action {
//   readonly type = TEMPLATE_REMOVE_ERROR;
//   constructor(public payload: string) { }
// }

// export class addZone implements Action {
//   readonly type = TEMPLATE_ADD_ZONE;
//   constructor(public payload: { template: template_model.ITemplate, zone: zone_model.IZone }) { }
// }
// export class addZoneSuccess implements Action {
//   readonly type = TEMPLATE_ADD_ZONE_SUCCESS;
//   constructor(public payload: { template: template_model.ITemplate, zone: zone_model.IZone }) { }
// }
// export class addZoneError implements Action {
//   readonly type = TEMPLATE_ADD_ZONE_ERROR;
//   constructor(public payload: string) { }
// }

// export class removeZone implements Action {
//   readonly type = TEMPLATE_REMOVE_ZONE;
//   constructor(public payload: { template: template_model.ITemplate, zone: zone_model.IZone }) { }
// }
// export class removeZoneSuccess implements Action {
//   readonly type = TEMPLATE_REMOVE_ZONE_SUCCESS;
//   constructor(public payload: { template: template_model.ITemplate, zone: zone_model.IZone }) { }
// }
// export class removeZoneError implements Action {
//   readonly type = TEMPLATE_REMOVE_ZONE_ERROR;
//   constructor(public payload: string) { }
// }

// export type All =
//   selectTemplate |
//   selectZone |

//   loadTemplates |
//   loadTemplatesSuccess |
//   loadTemplatesError |

//   addTemplate |
//   addTemplateSuccess |
//   addTemplateError |

//   removeTemplate |
//   removeTemplateSuccess |
//   removeTemplateError |

//   addZone |
//   addZoneSuccess |
//   addZoneError |

//   removeZone |
//   removeZoneSuccess |
//   removeZoneError;