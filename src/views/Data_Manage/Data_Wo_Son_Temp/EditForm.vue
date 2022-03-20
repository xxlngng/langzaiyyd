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
        <a-form-model-item label="工单状态" prop="WoStatus">
          <a-input v-model="entity.WoStatus" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="站址名称" prop="SiteName">
          <a-input v-model="entity.SiteName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="站址编码" prop="SiteCode">
          <a-input v-model="entity.SiteCode" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="故障原因" prop="FaultInfo">
          <a-input v-model="entity.FaultInfo" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="故障描述" prop="FaultRemark">
          <a-input v-model="entity.FaultRemark" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="地市" prop="City">
          <a-input v-model="entity.City" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="区县" prop="County">
          <a-input v-model="entity.County" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="网格" prop="Grid">
          <a-input v-model="entity.Grid" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="班组" prop="TeamName">
          <a-input v-model="entity.TeamName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="处理人员" prop="HandleMan">
          <a-input v-model="entity.HandleMan" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="时限（min）" prop="TimeLimit">
          <a-input v-model="entity.TimeLimit" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="图片地址" prop="ImpUrl">
          <a-input v-model="entity.ImpUrl" autocomplete="off" />
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
        this.$http.post('/Data_Manage/Data_Wo_Son_Temp/GetTheData', { id: id }).then(resJson => {
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
        this.$http.post('/Data_Manage/Data_Wo_Son_Temp/SaveData', this.entity).then(resJson => {
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
