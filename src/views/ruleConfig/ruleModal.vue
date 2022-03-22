<template>
  <a-modal
    :title="title"
    width="40%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="entity" :rules="rules" v-bind="layout">
        <a-form-model-item label="规则名称" prop="Name">
          <a-input v-model="entity.Name" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="权重值" prop="Weight">
          <a-input v-model="entity.Weight" autocomplete="off" />
        </a-form-model-item>

        <a-form-model-item label="涉及网站" prop="fileList">
          <template>
            <a-button type="primary" icon="download">下载模板</a-button>
            <a-upload
              style="margin-left: 8px"
              name="file"
              :multiple="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <a-button> <a-icon type="upload" />上传文件</a-button>
            </a-upload>
          </template>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
      },
      visible: false,
      title: '新增',
      confirmLoading: false,
      fileList: [],
      entity: {},
      rules: {
        Name: [{ required: true, message: '必填' }],
        Weight: [{ required: true, message: '必填' }],
        Sex: [{ required: true, message: '必填' }]
      }
    }
  },
  methods: {
    openModal(row) {
      this.visible = true

      if (row.Id) {
        this.title = '编辑'
        this.entity = Object.assign({}, row)
      } else {
        this.title = '修改'
      }
    },
    handleCancel() {
      this.visible = false
      this.entity = {}
      this.fileList = []
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        let formData = new FormData()
        // 向 formData 对象中添加文件
        if (this.entity.Id) {
          formData.append('data.Id', this.entity.Id)
        }
        formData.append('data.Name', this.entity.Name)
        formData.append('data.Weight', this.entity.Weight)
        if (this.fileList[0]) {
          formData.append('fromFile', this.fileList[0].originFileObj)
        }
        this.confirmLoading = true

        this.$http.post('/Data_Manage/Data_Rule_Config/SaveData_Rule_Config', formData).then(resJson => {
          this.confirmLoading = false

          if (resJson.Success) {
            this.$message.success('操作成功!')
            this.afterSubmit()
            this.handleCancel()
          } else {
            this.$message.error(resJson.Msg)
          }
        })
      })
    },
    beforeUpload(file, fileList) {
      return false
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>
