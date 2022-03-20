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
        <a-form-model-item label="通报类型" prop="ReportType">
          <a-input v-model="entity.ReportType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="区域名称" prop="AreaName">
          <a-input v-model="entity.AreaName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警名称" prop="AlarmName">
          <a-input v-model="entity.AlarmName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警开始时间" prop="AlarmStartTime">
          <a-input v-model="entity.AlarmStartTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="告警恢复时间" prop="AlarmEndTime">
          <a-input v-model="entity.AlarmEndTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单时限" prop="TimeLimit">
          <a-input v-model="entity.TimeLimit" autocomplete="off" />
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
        <a-form-model-item label="处理时间" prop="HandleTime">
          <a-input v-model="entity.HandleTime" autocomplete="off" />
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
        this.$http.post('/Data_Manage/Data_Wo_Son_WangYou/GetTheData', { id: id }).then(resJson => {
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
        this.$http.post('/Data_Manage/Data_Wo_Son_WangYou/SaveData', this.entity).then(resJson => {
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
