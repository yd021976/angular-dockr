import { Action } from '@ngrx/store';
// import * as template_model from '../models/template.model';
// import * as zone_model from '../models/zone.model';

// export const TEMPLATE_SELECT = "[TEMPLATES] SELECT TEMPLATE";
// export const TEMPLATE_SELECT_ZONE = "[TEMPLATES] SELECT ZONE";


// export const TEMPLATE_LOAD = "[TEMPLATES] LOAD";
// export const TEMPLATE_LOAD_SUCCESS = "[TEMPLATES] LOAD SUCCESS";
// export const TEMPLATE_LOAD_ERROR = "[TEMPLATES] LOAD ERROR";

// export const TEMPLATE_ADD = "[TEMPLATES] ADD";
// export const TEMPLATE_ADD_SUCCESS = "[TEMPLATES] ADD SUCCESS";
// export const TEMPLATE_ADD_ERROR = "[TEMPLATES] ADD ERROR";

// export const TEMPLATE_REMOVE = "[TEMPLATES] REMOVE";
// export const TEMPLATE_REMOVE_SUCCESS = "[TEMPLATES] REMOVE SUCCESS";
// export const TEMPLATE_REMOVE_ERROR = "[TEMPLATES] REMOVE ERROR";

// export const TEMPLATE_ADD_ZONE = "[TEMPLATES] ADD ZONE";
// export const TEMPLATE_ADD_ZONE_SUCCESS = "[TEMPLATES] ADD ZONE SUCCESS";
// export const TEMPLATE_ADD_ZONE_ERROR = "[TEMPLATES] ADD ZONE ERROR";

// export const TEMPLATE_REMOVE_ZONE = "[TEMPLATES] REMOVE ZONE";
// export const TEMPLATE_REMOVE_ZONE_SUCCESS = "[TEMPLATES] REMOVE ZONE SUCCESS";
// export const TEMPLATE_REMOVE_ZONE_ERROR = "[TEMPLATES] REMOVE ZONE ERROR";

// export class loadTemplates implements Action {
//   readonly type = TEMPLATE_LOAD;
//   constructor() { }
// }
// export class loadTemplatesSuccess implements Action {
//   readonly type = TEMPLATE_LOAD_SUCCESS;
//   constructor(public payload: template_model.ITemplate[]) { }
// }
// export class loadTemplatesError implements Action {
//   readonly type = TEMPLATE_LOAD_ERROR;
//   constructor(public payload: string) { }
// }

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