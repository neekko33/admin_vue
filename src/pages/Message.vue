<template>
  <el-card style="height: 99%;padding: 30px;box-sizing: border-box;">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="内容:">
          <el-input
            type="textarea"
            maxlength="30"
            :rows="5"
            show-word-limit
            v-model="content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmBtn">确 定</el-button>
      </span>
    </el-dialog>
    <div style="position:relative;padding-top: 5%;">
      <el-button
        type="primary"
        size="large"
        style="position: absolute;top: 10px;right: 10px;"
        @click="handleAddBtn"
        >新增留言</el-button
      >
      <el-table
        :data="messageList"
        border
        size="large"
        style="margin-bottom: 5%"
      >
        <el-table-column
          label="ID"
          type="index"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="editorName"
          label="用户名"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          align="center"
        ></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{ row }">
            {{ formatTime(Number(row.createTime)) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="danger" @click="handleDelBtn(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-pagination background layout="prev, pager, next" :total="1000">-->
      <!--      </el-pagination>-->
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getMessageList, deleteMessage, addMessage } from "../api/message";
import { MessageData } from "../interface";
import moment from "moment";

@Component
export default class Message extends Vue {
  private dialogTitle = "";
  private centerDialogVisible = false;
  private messageList: MessageData[] = [];
  private content = "";
  public created() {
    this.getMessage();
  }
  public formatTime(time: number) {
    return moment(Number(time)).format("YYYY-MM-DD");
  }
  public async getMessage() {
    try {
      const {
        data: { data }
      } = await getMessageList();
      this.messageList = data;
    } catch (e) {
      console.log(e);
    }
  }
  public handleAddBtn() {
    this.dialogTitle = "新增留言";
    this.content = "";
    this.centerDialogVisible = true;
  }
  public async handleConfirmBtn() {
    if (this.content === "") {
      this.$notify.warning({
        title: "警告",
        message: "内容不能为空"
      });
    }
    this.centerDialogVisible = false;
    const editorName = JSON.parse(
      window.localStorage.getItem("USER_INFO") as string
    ).username;
    try {
      const {
        data: { code }
      } = await addMessage({
        editorName,
        content: this.content,
        createTime: new Date().getTime()
      });
      if (code === 0) {
        this.$notify.success({
          title: "成功",
          message: "添加成功"
        });
      }
      await this.getMessage();
    } catch (e) {
      this.$notify.error({
        title: "失败",
        message: "添加失败"
      });
      console.log(e);
    }
  }

  public handleDelBtn(row: MessageData) {
    this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        try {
          const {
            data: { code }
          } = await deleteMessage(row.id as number);
          if (code === 0) {
            this.$notify.success({
              title: "成功",
              message: "删除成功"
            });
          }
          await this.getMessage();
        } catch (e) {
          this.$notify.error({
            title: "失败",
            message: "删除失败"
          });
          console.log(e);
        }
      })
      .catch(() => {
        this.$notify.info({
          title: "提示",
          message: "取消删除"
        });
      });
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 0 20px;
}
</style>
