import { Resource } from 'kolibri.lib.apiResource';

export default class ContentReportResource extends Resource {
  static resourceName() {
    return 'kolibri:coach:contentreport';
  }
  static idKey() {
    return 'pk';
  }
  static resourceIdentifiers() {
    return ['channel_id', 'content_node_id', 'collection_kind', 'collection_id'];
  }
}
