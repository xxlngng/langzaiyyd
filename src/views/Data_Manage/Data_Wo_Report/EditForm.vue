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
        <a-form-model-item label="机构" prop="Organization">
          <a-input v-model="entity.Organization" autocomplete="off" />
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
        <a-form-model-item label="班组" prop="Team">
          <a-input v-model="entity.Team" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="故障类型" prop="FaultType">
          <a-input v-model="entity.FaultType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单类型" prop="WoType">
          <a-input v-model="entity.WoType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单数量" prop="WoTatal">
          <a-input v-model="entity.WoTatal" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="已处理工单数量" prop="HadDoNum">
          <a-input v-model="entity.HadDoNum" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="未处理工单数量" prop="NotDoNum">
          <a-input v-model="entity.NotDoNum" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="工单处理率" prop="Rate">
          <a-input v-model="entity.Rate" autocomplete="off" />
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
        this.$http.post('/Data_Manage/Data_Wo_Report/GetTheData', { id: id }).then(resJson => {
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
        this.$http.post('/Data_Manage/Data_Wo_Report/SaveData', this.entity).then(resJson => {
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
