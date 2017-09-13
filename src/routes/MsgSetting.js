import React from 'react';
import { connect } from 'dva';
import styles from './MsgSetting.less';

function MsgSetting() {
  return (
    <div className={styles.normal}>
      Route Component: MsgSetting
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MsgSetting);
