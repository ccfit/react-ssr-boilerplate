import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { getHomeList } from "./store/actions";
import styles from "./style.css";
import withStyle from "../../withStyle";

class Home extends Component {
  onClickItem(title) {}
  getList() {
    const { list } = this.props;
    return list.map((item) => (
      <div
        className={styles.item}
        key={item.id}
        onClick={() => {
          this.onClickItem(item.title);
        }}
      >
        {item.title}
      </div>
    ));
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>首页新闻</title>
          <meta name="description" content="新闻页面 - 丰富多彩的资讯" />
        </Helmet>
        
        <div className={styles.container}>{this.getList()}</div>
      </Fragment>
    );
  }

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList();
    }
  }
}

const mapStateToProps = (state) => ({
  list: state.home.newsList,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList());
  },
});

const ExportHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyle(Home, styles));

ExportHome.loadData = (store) => {
  return store.dispatch(getHomeList());
};

export default ExportHome;
