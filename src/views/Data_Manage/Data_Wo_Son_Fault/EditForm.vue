<template>
  <a-modal
    :title="title"
    width="40%"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handleSubmit"
    @cancel="()=>{this.visible=false}"
  >
    <a-spin :spinning="loading">
      <a-form-model ref="form" :model="entity" :rules="rules" v-bind="layout">
        <a-form-model-item label="创建人" prop="CreaterId">
          <a-input v-model="entity.CreaterId" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="更新时间" prop="UpdateTime">
          <a-input v-model="entity.UpdateTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="更新人" prop="UpdaterId">
          <a-input v-model="entity.UpdaterId" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="Remark">
          <a-input v-model="entity.Remark" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="基站Id" prop="WoParentId">
          <a-input v-model="entity.WoParentId" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="电话号码" prop="Tel">
          <a-input v-model="entity.Tel" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="派单时间" prop="SendWoTime">
          <a-input v-model="entity.SendWoTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="时限" prop="TimeLimit">
          <a-input v-model="entity.TimeLimit" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="故障设备类型" prop="FalutType">
          <a-input v-model="entity.FalutType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警类型" prop="AlarmStatus">
          <a-input v-model="entity.AlarmStatus" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警描述" prop="AlarmInfo">
          <a-input v-model="entity.AlarmInfo" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="站点运维Id" prop="OperationID">
          <a-input v-model="entity.OperationID" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="站址名称" prop="SiteName">
          <a-input v-model="entity.SiteName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单历时（分钟）" prop="TimeTake">
          <a-input v-model="entity.TimeTake" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警时间" prop="AlarmTime">
          <a-input v-model="entity.AlarmTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="图片地址" prop="ImpUrl">
          <a-input v-model="entity.ImpUrl" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="故障描述" prop="FaultRemark">
          <a-input v-model="entity.FaultRemark" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单状态" prop="WoStatus">
          <a-input v-model="entity.WoStatus" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="处理人" prop="HandleMan">
          <a-input v-model="entity.HandleMan" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="处理时间" prop="HandTime">
          <a-input v-model="entity.HandTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="归档时间" prop="OverTime">
          <a-input v-model="entity.OverTime" autocomplete="off" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  props: {
    parentObj: Object
  },
  data() {
    return {
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
      },
      visible: false,
      loading: false,
      entity: {},
      rules: {},
      title: ''
    }
  },
  methods: {
    init() {
      this.visible = true
      this.entity = {}
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    openForm(id, title) {
      this.init()

      if (id) {
        this.loading = true
        this.$http.post('/Data_Manage/Data_Wo_Son_Fault/GetTheData', { id: id }).then(resJson => {
          this.loading = false

          this.entity = resJson.Data
        })
      }
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.loading = true
        this.$http.post('/Data_Manage/Data_Wo_Son_Fault/SaveData', this.entity).then(resJson => {
          this.loading = false

          if (resJson.Success) {
            this.$message.success('操作成功!')
            this.visible = false

            this.parentObj.getDataList()
          } else {
            this.$message.error(resJson.Msg)
          }
        })
      })
    }
  }
}
</script>
