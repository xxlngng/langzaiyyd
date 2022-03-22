<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="地规则名称：">
              <a-input placeholder="请输入地规则名称" v-model="queryParam.Name"></a-input>
            </a-form-item>
          </a-col>
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="addRule" icon="export" style="margin-left: 8px">新增规则</a-button>
          </span>
          <!-- </a-col> -->
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="Id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="editRule(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record.Id)">删除</a>
      </span>
    </a-table>

    <ruleModal ref="refModal" :afterSubmit="loadData" />
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'
import ruleModal from './ruleModal'

export default {
  mixins: [xlMixin],
  components: { ruleModal },
  props: {},
  data() {
    return {
      columns: [
        {
          title: '序号',
          align: 'center',
          width: '50px',
          customRender(text, record, index) {
            return index + 1
          }
        },
        {
          title: '规则名称',
          align: 'center',
          dataIndex: 'Name'
        },
        {
          title: '权重值',
          align: 'center',
          dataIndex: 'Weight'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'CreateTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 180,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/Data_Manage/Data_Rule_Config/GetData_Rule_ConfigList',
        delete: '/Data_Manage/Data_Rule_Config/DeleteData_Rule_Config'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addRule() {
      this.$refs.refModal.openModal({})
    },
    editRule(record) {
      this.$refs.refModal.openModal(record)
    },
    deleteRule() {}
  }
}
</script>
