/* eslint-disable no-undef */
<template>
  <el-form
    :model="form"
    label-width="100px"
    label-position="right"
    style="width: 50%;"
  >
    <el-form-item label="用户名：">
      <el-input
        v-model="form.username"
        disabled
        placeholder="请输入用户名，注：该用户名用于后台系统的登陆"
      ></el-input>
    </el-form-item>
    <el-form-item label="昵称：">
      <el-input
        v-model="form.nickname"
        clearable
        placeholder="请输入在作者页面显示的昵称，显示格式例：@neekko33"
      ></el-input>
    </el-form-item>
    <el-form-item label="标签：">
      <el-input
        v-model="form.tags"
        placeholder="请输入个性标签，以英文逗号分隔，例：艾泽拉斯探险家,Steam游戏蝗虫"
      ></el-input>
    </el-form-item>
    <el-form-item label="地址：">
      <el-select label="地址：" v-model="city" style="width:calc(50% - 10px)">
        <el-option
          v-for="item in province"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-input
        v-model="area"
        placeholder="请输入地区"
        style="width:50%;margin-left:10px;"
      ></el-input>
    </el-form-item>
    <el-form-item label="个性签名：">
      <el-input
        v-model="form.introduce"
        type="textarea"
        :rows="6"
        placeholder="请输入个性签名"
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align: left;">
      <el-button type="primary" @click="Submit">保存更改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserData } from "@/interface";
import { getUserById, updateUser } from "@/api/user";
@Component
export default class Info extends Vue {
  private form: UserData = {
    id: JSON.parse(window.localStorage.getItem("USER_INFO") as string).id,
    username: "",
    nickname: "",
    tags: "",
    address: "",
    introduce: ""
  };
  private city = "";
  private area = "";
  private province: string[] = [
    "北京市",
    "上海市",
    "天津市",
    "重庆市",
    "河北省",
    "山西省",
    "辽宁省",
    "吉林省",
    "河南省",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "江西省",
    "山东省",
    "湖北省",
    "湖南省",
    "广东省",
    "海南省",
    "四川省",
    "贵州省",
    "云南省",
    "陕西省",
    "甘肃省",
    "青海省",
    "黑龙江省",
    "内蒙古自治区",
    "广西壮族自治区",
    "西藏自治区",
    "宁夏回族自治区",
    "新疆维吾尔自治区",
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区"
  ];
  public created() {
    this.GetUser();
  }
  public async GetUser() {
    const {
      data: { data, code }
    } = await getUserById(this.form.id as number);
    if (code != 0) {
      this.$notify.error({
        title: "错误",
        message: "获取用户信息失败"
      });
    }
    this.form = data;
    const map = this.form.address.split("/");
    this.city = map[0].trim();
    this.area = map[1].trim();
  }
  public async Submit() {
    for (const key in this.form) {
      if (typeof this.form[key] == "number") {
        continue;
      }
      if (this.form[key].trim() == "") {
        this.$notify.error({
          title: "错误",
          message: "输入不能为空"
        });
        return;
      }
    }
    this.form.address = `${this.city} / ${this.area}`;
    await updateUser(this.form.id as number, this.form);
    this.$notify.success({
      title: "成功",
      message: "保存成功"
    });
    this.GetUser();
  }
}
</script>

<style></style>
