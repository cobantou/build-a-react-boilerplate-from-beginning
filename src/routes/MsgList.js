import React from 'react';
import { connect } from 'dva';
import styles from './MsgList.less';

function MsgList() {
  return (
    <div className={styles.normal}>
      Route Component: MsgList
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MsgList);
