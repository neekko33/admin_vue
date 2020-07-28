import request from "../utils/request";
import { MessageData } from "../interface";

export function getMessageList() {
  return request({
    url: "/message",
    method: "get"
  });
}

export function addMessage(params: MessageData) {
  return request({
    url: "/message",
    method: "post",
    data: params
  });
}

export function deleteMessage(id: number) {
  return request({
    url: "/message/" + id,
    method: "delete"
  });
}
