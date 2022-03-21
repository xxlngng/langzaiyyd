<template>
  <a-modal title="详情" width="70%" :visible="visible" :confirmLoading="confirmLoading" @cancel="cancel">
    <a-spin :spinning="confirmLoading">
      <a-card>
        <template slot="title">
          <p style="margin-bottom: 0">工单信息</p>
        </template>
        <a-descriptions>
          <a-descriptions-item label="工单状态">
            {{ data.WoStatus }}
          </a-descriptions-item>
          <a-descriptions-item label="处理人/部门">
            {{ data.HandleMan }}
          </a-descriptions-item>
          <a-descriptions-item label="处理人电话">
            {{ data.Tel }}
          </a-descriptions-item>
          <a-descriptions-item label="派单时间">
            {{ data.SendWoTime }}
          </a-descriptions-item>
          <a-descriptions-item label="时限（分钟）">
            {{ data.TimeLimit }}
          </a-descriptions-item>
          <a-descriptions-item label="故障设备类型">
            {{ data.FalutType }}
          </a-descriptions-item>
          <a-descriptions-item label="告警状态">
            {{ data.AlarmStatus }}
          </a-descriptions-item>
          <a-descriptions-item label="告警描述">
            {{ data.AlarmInfo }}
          </a-descriptions-item>
          <a-descriptions-item label="站址运维ID">
            {{ data.OperationID }}
          </a-descriptions-item>
          <a-descriptions-item label="站址名称">
            {{ data.OperationID }}
          </a-descriptions-item>
          <a-descriptions-item label="工单历时(分钟)">
            {{ data.TimeTake }}
          </a-descriptions-item>
          <a-descriptions-item label="告警时间">
            {{ data.AlarmTime }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <a-card style="margin-top: 10px">
        <template slot="title">
          <p style="margin-bottom: 0">处理信息</p>
        </template>
        <a-descriptions :column="1">
          <a-descriptions-item label="故障说明">
            {{ data.FaultRemark }}
          </a-descriptions-item>
          <a-descriptions-item label="现场照片">
            <img alt="图片" style="width: 100px" :src="data.ImpUrl" @click="previewImage = data.ImpUrl" />
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-spin>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="预览" style="width: 100%" :src="previewImage" />
    </a-modal>
    <template slot="footer">
      <a-button click="cancel" @click="visible=false">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      visible: false,
      confirmLoading: false,
      data: {},
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    openModal(row) {
      this.visible = true
      this.confirmLoading = true

      this.$http
        .post('/Data_Manage/Data_Wo_Son_Fault/GetData_Wo_Son_Fault', { id: row.Id })
        .then(res => {
          if (res.Success) {
            this.data = res.Data
          } else {
            this.$message.warning(res.Msg)
          }
          this.confirmLoading = false
        })
        .catch(() => {
          this.confirmLoading = false
        })
    },
    cancel() {
      this.visible = false
    },
    handlePreview(file) {
      this.previewVisible = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  }
}
</script>
