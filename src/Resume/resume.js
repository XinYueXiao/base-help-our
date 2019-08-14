const formJson = {
  baseInfo: [
    {
      label: "姓名",
      key: "name"
    },
    {
      label: "电话",
      key: "phone"
    },
    {
      label: "email",
      key: "email"
    },
    {
      label: "学历",
      key: "education",
      required: 1
    }
  ],
  companyInfo: {
    key: "companyList",
    name: "公司名称",
    description: "工作介绍",
    remark: "在公司主要负责什么，有什么突出贡献"
  },
  projectInfo: {
    key: "productList",
    name: "项目名称",
    description: "项目描述",
    remark: "在项目中主要负责那部分，项目架构，项目解决方案"
  }
};

export default {
  formJson
};
