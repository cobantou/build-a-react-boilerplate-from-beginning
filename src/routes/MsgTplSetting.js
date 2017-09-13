import React from 'react';
import { connect } from 'dva';
import styles from './MsgTplSetting.less';

function MsgTplSetting() {
  return (
    <div className={styles.normal}>
      Route Component: MsgTplSetting
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MsgTplSetting);
