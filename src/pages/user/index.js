import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import {
  UserWrapper,
  UserTitle,
  UserContent,
  UserContentList,
  UserContentItem,
  UserInfo,
  UserContentNone
} from "./style";
import { actionCreators } from "./store";
import { formatDate } from "./../../utils";
import { Link } from "react-router-dom";
import TopNav from "./../../common/topnav";

class User extends PureComponent {
  render() {
    let { userInfo } = this.props;
    if (userInfo.size > 0) {
      let newUserInfo = userInfo.toJS();
      return (
        <Fragment>
          <TopNav title={"用户详情"} />
          <UserInfo>
            <img src={newUserInfo.avatar_url} alt="avatar_url" />
            <p className="user-name">{newUserInfo.loginname}</p>
            <p className="more">
              <span>积分：{newUserInfo.score}</span>
              <span>注册于：{formatDate(newUserInfo.create_at)}</span>
            </p>
          </UserInfo>
          <UserWrapper>
            <UserTitle>最近创建的话题</UserTitle>
            <UserContent>
              {newUserInfo.recent_topics.length ? (
                <UserContentList>
                  {newUserInfo.recent_topics.map((it, index) => {
                    return (
                      <UserContentItem key={index}>
                        <Link to={"/detail/" + it.id}>{it.title}</Link>
                      </UserContentItem>
                    );
                  })}
                </UserContentList>
              ) : (
                <UserContentNone>暂无话题</UserContentNone>
              )}
            </UserContent>
          </UserWrapper>
          <UserWrapper>
            <UserTitle>最近参与的话题</UserTitle>
            {newUserInfo.recent_replies.length ? (
              <UserContentList>
                {newUserInfo.recent_replies.map((it, index) => {
                  return (
                    <UserContentItem key={index}>
                      <Link to={"/detail/" + it.id}>{it.title}</Link>
                    </UserContentItem>
                  );
                })}
              </UserContentList>
            ) : (
              <UserContentNone>暂无话题</UserContentNone>
            )}
          </UserWrapper>
        </Fragment>
      );
    } else {
      return null;
    }
  }
  componentDidMount() {
    try {
      this.props.getUserInfo(this.props.match.params.id);
    } catch (e) {
      this.props.getUserInfo(this.props.mine);
    }
  }
}

const mapState = state => {
  return {
    userInfo: state.getIn(["user", "userInfo"])
  };
};

const mapDispatch = dispatch => {
  return {
    getUserInfo(id) {
      dispatch(actionCreators.getUserInfo(id));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(User);
