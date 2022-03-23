<template>
  <a-modal title="详情" width="70%" :visible="visible" :confirmLoading="confirmLoading" @cancel="cancel">
    <a-spin :spinning="confirmLoading">
      <a-card>
        <template slot="title">
          <p style="margin-bottom: 0">工单信息</p>
        </template>
        <a-descriptions>
          <a-descriptions-item v-for="(item, index) in infoCol" :key="index" :label="item.name">
            {{ data[item.value] }}
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
            <img alt="图片" style="width: 100px" :src="data.ImpUrl" @click="handlePreview(data.ImpUrl)" />
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-spin>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="预览" style="width: 100%" :src="previewImage" />
    </a-modal>
    <template slot="footer">
      <a-button click="cancel" @click="visible = false">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      visible: false,
      infoCol: [],
      confirmLoading: false,
      data: {},
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    openModal(row, info,url) {
      this.infoCol = info
      this.visible = true
      this.confirmLoading = true

      this.$http
        .post(url, { id: row.Id })
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
    handlePreview(url) {
      this.previewVisible = true
      this.previewImage = url
    }
  }
}
</script>
