<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="区县：">
              <a-input placeholder="请输入区县" v-model="queryParam.County"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="网格：">
              <a-input placeholder="请输入网格：" v-model="queryParam.Grid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="专业类型：">
              <a-input placeholder="请输入专业类型" v-model="queryParam.MojorType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="隐患类型：">
              <a-input placeholder="请输入隐患类型" v-model="queryParam.FaultType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="基站名称：">
              <a-input placeholder="请输入基站名称" v-model="queryParam.SiteName"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="10" :sm="10"> -->
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('铁塔故障工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
          </span>
          <!-- </a-col> -->
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="small"
      bordered
      rowKey="Id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="detail(record)">详情</a>
      </span>
    </a-table>

    <libModal ref="refModal" @loadData="loadData" />
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'
import libModal from './libModal'

export default {
  mixins: [xlMixin],
  components: { libModal },
  props: {},
  data() {
    return {
      columns: [
        {
          title: '序号',
          align: 'center',
          width: '50px',
          customRender(a,b,c) {
            return c+1
          }
        },
        {
          title: '区县',
          align: 'center',
          dataIndex: 'County'
        },
        {
          title: '网格',
          align: 'center',
          dataIndex: 'Grid'
        },
        {
          title: '专业类型',
          align: 'center',
          dataIndex: 'MojorType'
        },
        {
          title: '隐患类型',
          align: 'center',
          dataIndex: 'FaultType'
        },
        {
          title: '基站名称',
          align: 'center',
          dataIndex: 'SiteName'
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
        list: '/Data_Manage/Data_ProPools/GetData_ProPoolsList',
        exportXlsUrl: '/Data_Manage/Data_ProPools/Data_ProPoolsExport'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    detail(record) {
      this.$refs.refModal.openModal(record)
    }
  }
}
</script>
