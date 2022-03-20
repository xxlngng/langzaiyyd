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
        <a-form-model-item label="创建时间" prop="UpdateTime">
          <a-input v-model="entity.UpdateTime" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="创建人" prop="UpdaterId">
          <a-input v-model="entity.UpdaterId" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="基站名称" prop="SiteName">
          <a-input v-model="entity.SiteName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="专业类型（铁塔代维、移动传输、移动无线、移动网优）" prop="MojorType">
          <a-input v-model="entity.MojorType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="隐患类型（塔类隐患、房类隐患、配套设备类隐患、移动传输设备类隐患、移动无线设备类隐患、其他隐患）" prop="FaultType">
          <a-input v-model="entity.FaultType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="隐患描述" prop="FaultRemark">
          <a-input v-model="entity.FaultRemark" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="图片地址" prop="ImpUrl">
          <a-input v-model="entity.ImpUrl" autocomplete="off" />
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
        this.$http.post('/Data_Manage/Data_FaultInfo/GetTheData', { id: id }).then(resJson => {
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
        this.$http.post('/Data_Manage/Data_FaultInfo/SaveData', this.entity).then(resJson => {
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
