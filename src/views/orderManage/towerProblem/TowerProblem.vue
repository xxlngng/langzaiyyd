<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="8" :sm="8">
            <a-form-item label="工单状态：">
              <a-input placeholder="请输入工单状态" v-model="queryParam.WoStatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8">
            <a-form-item label="处理人/部门：">
              <a-input placeholder="请输入处理人/部门" v-model="queryParam.HandleMan"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8">
            <a-form-item label="站址名称：">
              <a-input placeholder="请输入站址名称" v-model="queryParam.SiteName"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="10" :sm="10"> -->
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('铁塔故障工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
            <a-button
              type="primary"
              @click="handleExportXls2('http://ecds.rjtx.net/Upload/downFileModel/fault_input_model.xlsx')"
              icon="download"
              style="margin-left: 8px"
              >下载模板</a-button
            >
            <a-upload
              style="margin-left: 8px"
              name="file"
              :multiple="true"
              :headers="tokenHeader"
              :customRequest="httpRequest"
              :showUploadList='false'
            >
              <a-button> <a-icon type="upload" />上传</a-button>
            </a-upload>
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
        <a @click="detail(record)">详情</a>
      </span>
    </a-table>

    <DetailModal ref="refModal" @loadData="loadData" />
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'
import DetailModal from '../public/DetailModal'

export default {
  mixins: [xlMixin],
  components: { DetailModal },
  props: {},
  data() {
    return {
      columns: [
        {
          title: '工单状态',
          align: 'center',
          dataIndex: 'WoStatus'
        },
        {
          title: '处理人/部门',
          align: 'center',
          dataIndex: 'HandleMan'
        },
        {
          title: '处理人电话',
          align: 'center',
          dataIndex: 'Tel'
        },
        {
          title: '派单时间',
          align: 'center',
          dataIndex: 'SendWoTime'
        },
        {
          title: '时限（分钟）',
          align: 'center',
          dataIndex: 'TimeLimit'
        },
        {
          title: '故障设备类型',
          align: 'center',
          dataIndex: 'FalutType'
        },
        {
          title: '告警状态',
          align: 'center',
          dataIndex: 'AlarmStatus'
        },
        {
          title: '告警描述',
          align: 'center',
          dataIndex: 'AlarmInfo'
        },
        {
          title: '站址运维ID',
          align: 'center',
          dataIndex: 'OperationID'
        },
        {
          title: '站址名称',
          align: 'center',
          dataIndex: 'SiteName'
        },
        {
          title: '工单历时（分钟）',
          align: 'center',
          dataIndex: 'TimeTake'
        },
        {
          title: '告警时间',
          align: 'center',
          dataIndex: 'AlarmTime'
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
        list: '/Data_Manage/Data_Wo_Son_Fault/GetData_Wo_Son_FaultList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Son_Fault/Data_Wo_Son_FaultExport'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    detail(record) {
      const info = [
        { name: '工单状态', value: 'WoStatus' },
        { name: '处理人/部门', value: 'WoStatus' },
        { name: '处理人电话', value: 'Tel' },
        { name: '派单时间', value: 'SendWoTime' },
        { name: '时限（分钟）', value: 'TimeLimit' },
        { name: '故障设备类型', value: 'FalutType' },
        { name: '告警状态', value: 'AlarmStatus' },
        { name: '告警描述', value: 'AlarmInfo' },
        { name: '站址运维ID', value: 'OperationID' },
        { name: '站址名称', value: 'SiteName' },
        { name: '站址编码', value: 'SiteCode' },
        { name: '工单历时(分钟)', value: 'TimeTake' },
        { name: '告警时间', value: 'AlarmTime' }
      ]
      this.$refs.refModal.openModal(record,info,'/Data_Manage/Data_Wo_Son_Fault/GetData_Wo_Son_Fault')
    },
    httpRequest(option) {
      this.handleImport1(option, '/Data_Manage/Data_Wo_Son_Fault/Data_Wo_Son_FaultInput')
    }
  }
}
</script>
