/**
 * cityData树形数据
 * options热门标签数据
 * onClickOk确定按钮操作
 * onClickCancel取消按钮操作
 */
import React, { Component } from "react";

import "./index.css";
import { Tree, Tag, Input, Divider, Button } from "antd";
import PropTypes from "prop-types";
import cityData from "./cityData";
import debounce from "lodash/debounce";
const { CheckableTag } = Tag;
const TreeNode = Tree.TreeNode;
const { Search } = Input;
//获取父节点
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class TreeTransfer extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired,
    onClickCancel: PropTypes.func,
    onOkClick: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      checkedKeys: props.value || [],
      selectedKeys: []
    };
    this.dataList = [];
    this.showListToMap = {};
  }
  componentDidMount = () => {
    // const { cityData } = this.props
    //查询使用二维转一维数组
    const dataList = [];
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key: String(key), title: String(key) });
        if (node.children) {
          generateList(node.children, node.key);
        }
      }
    };
    generateList(cityData);
    this.dataList = dataList;
    const showList = [];
    //数据展示处理
    const getShowList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        showList.push({ key: node.key, title: node.title });
        if (node.children) {
          getShowList(node.children, node.key);
        }
      }
    };
    getShowList(cityData);
    //选中集合数据处理
    const showListToMap = showList.reduce((item, next) => {
      item[next.key] = next;
      return item;
    }, {});
    this.showListToMap = showListToMap;
  };
  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      this.setState({
        checkedKeys: [...(nextProps.value || [])]
      });
      this.setSelected(nextProps.value || []);
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };
  //选中事件
  onCheck = (checkedKeys = []) => {
    this.setState({ checkedKeys });
    this.setSelected(checkedKeys);
  };
  //设置右侧选中事件
  setSelected = (checkedKeys = []) => {
    // const { cityData } = this.props
    const selectedKeys = [];
    checkedKeys.forEach(one => {
      let parentNode = String(getParentKey(one, cityData));
      if (!(selectedKeys.indexOf(parentNode) > -1)) {
        selectedKeys.push(one);
      }
    });
    this.setState({ selectedKeys });
  };
  //查询方法
  onChangeSearch = e => {
    const { value } = e.target;
    const expandedKeys = this.dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, cityData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  };
  //删除已选择方法
  onCloseKeys = id => () => {
    const { checkedKeys } = this.state;
    console.log(checkedKeys, id);

    this.setState({
      checkedKeys: checkedKeys.filter(one => one != id)
    });
  };
  //热门城市点击事件
  onHotTagClick = id => () => {
    id = String(id);
    const { checkedKeys } = this.state;
    let checkedNow = [...checkedKeys];
    if (checkedKeys.indexOf(id) > -1) {
      checkedNow = checkedKeys.filter(one => one !== id);
    } else {
      checkedNow.push(id);
    }
    this.setSelected(checkedNow);
    this.setState({
      checkedKeys: checkedNow
    });
  };
  onOkClick = () => {
    const { onChange, onOkClick } = this.props;
    const { selectedKeys } = this.state;
    const optionsNames = selectedKeys
      .map(one => {
        return this.showListToMap[one].title;
      })
      .join(",");
    onChange && onChange([...selectedKeys]);
    onOkClick && onOkClick({ optionsNames });
  };
  onClickCancel = () => {
    this.setState({
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: []
    });

    this.props.onClickCancel();
  };

  render() {
    const { options } = this.props;
    const {
      searchValue,
      expandedKeys,
      autoExpandParent,
      checkedKeys,
      selectedKeys
    } = this.state;
    //渲染属性图
    const loop = data =>
      data.map((item, i) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} />;
      });
    return (
      <div className="tree-transfer">
        <div className="tree-transfer-left">
          <div className="hot-city">
            {options.map((one, index) => {
              return (
                <CheckableTag
                  checked={checkedKeys.includes(one.key)}
                  onChange={this.onHotTagClick(one.key)}
                  key={index}
                >
                  {one.title}
                </CheckableTag>
              );
            })}
          </div>
          <Divider style={{ marginBottom: 0, marginTop: 16 }} />
          {/* <Search
            style={{ margin: "10px auto" }}
            placeholder="Search"
            onChange={this.onChangeSearch}
          /> */}
          <div className="left-tree">
            <Tree
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              checkable={true}
              onCheck={this.onCheck}
              checkedKeys={checkedKeys}
            >
              {loop(cityData)}
            </Tree>
          </div>
          <div className="left-footer">
            <Button onClick={this.onClickCancel} style={{ marginRight: 10 }}>
              取消
            </Button>
            <Button
              type="primary"
              disabled={selectedKeys.length == 0}
              onClick={this.onOkClick}
            >
              确定
            </Button>
          </div>
        </div>
        <div className="tree-transfer-right">
          <div className="right-title">
            <span>已选结果</span>
            <a
              onClick={() => {
                this.setState({ selectedKeys: [], checkedKeys: [] });
              }}
            >
              清空
            </a>
          </div>
          <div className="right-content">
            {selectedKeys.map(one => {
              return (
                <Tag
                  className="tag-item"
                  key={one}
                  closable
                  onClose={this.onCloseKeys(one)}
                >
                  {this.showListToMap[one].title}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TreeTransfer;
