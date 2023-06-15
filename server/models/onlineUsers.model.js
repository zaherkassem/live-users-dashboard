import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'online_users';

/**
 * OnlineUsers model.
 */
class OnlineUsers extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default OnlineUsers;