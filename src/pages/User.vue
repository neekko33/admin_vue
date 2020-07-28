<template>
  <el-card style="height: 99%;padding: 30px;box-sizing: border-box;">
    <div style="position:relative;padding-top: 5%;">
      <el-button
        type="primary"
        size="large"
        style="position: absolute;top: 10px;right: 10px;"
        disabled
        >新增用户</el-button
      >
      <el-table :data="userList" border size="large" style="margin-bottom: 5%">
        <el-table-column
          label="ID"
          type="index"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <el-button type="danger" disabled>删除</el-button>
        </el-table-column>
      </el-table>
      <!--      <el-pagination background layout="prev, pager, next" :total="1000">-->
      <!--      </el-pagination>-->
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getUserList } from "../api/user";
import { UserData } from "../interface";

@Component
export default class Type extends Vue {
  private userList: UserData[] = [];
  public created() {
    this.getUser();
  }
  public async getUser() {
    try {
      const {
        data: { data }
      } = await getUserList();
      this.userList = data;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 0 20px;
}
</style>
