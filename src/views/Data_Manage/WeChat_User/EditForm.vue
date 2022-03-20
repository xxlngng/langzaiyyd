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
        <a-form-model-item label="用户名称" prop="UserName">
          <a-input v-model="entity.UserName" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="电话号码" prop="Tel">
          <a-input v-model="entity.Tel" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="所属线条" prop="Line">
          <a-input v-model="entity.Line" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="公司类别" prop="CompanyType">
          <a-input v-model="entity.CompanyType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="区域类别" prop="AreaType">
          <a-input v-model="entity.AreaType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="网格类别" prop="GridType">
          <a-input v-model="entity.GridType" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="openid" prop="OpenId">
          <a-input v-model="entity.OpenId" autocomplete="off" />
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
        this.$http.post('/Data_Manage/WeChat_User/GetTheData', { id: id }).then(resJson => {
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
        this.$http.post('/Data_Manage/WeChat_User/SaveData', this.entity).then(resJson => {
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
