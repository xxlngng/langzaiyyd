<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="工单状态：">
              <a-input placeholder="请输入工单状态" v-model="queryParam.WoStatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="计划名称：">
              <a-input placeholder="请输入计划名称：" v-model="queryParam.PlanName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="站址名称：">
              <a-input placeholder="请输入站址名称" v-model="queryParam.SiteName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="站址编码：">
              <a-input placeholder="请输入站址编码" v-model="queryParam.SiteCode"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="10" :sm="10"> -->
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('铁塔巡检工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
            <a-button
              type="primary"
              @click="handleExportXls2('http://ecds.rjtx.net/Upload/downFileModel/check_input_model.xlsx')"
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

    <DetailModal ref="refModal" @loadData="loadData" />
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'
import DetailModal from '../public/DetailModal'
import moment from 'moment'

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
          title: '计划名称',
          align: 'center',
          dataIndex: 'PlanName'
        },
        {
          title: '专业',
          align: 'center',
          dataIndex: 'Major'
        },
        {
          title: '计划执行时间',
          align: 'center',
          dataIndex: 'ExecuteTime',
          customRender(t) {
            return t&&moment(t).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '站址编码',
          align: 'center',
          dataIndex: 'SiteCode'
        },
        {
          title: '受理专业',
          align: 'center',
          dataIndex: 'HandleMajor'
        },
        {
          title: '站址名称',
          align: 'center',
          dataIndex: 'SiteName'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'Status'
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
        list: '/Data_Manage/Data_Wo_Son_Check/GetData_Wo_Son_CheckList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Son_Check/Data_Wo_Son_CheckExport'
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
        { name: '计划名称', value: 'PlanName' },
        { name: '专业', value: 'Major' },
        { name: '计划执行时间', value: 'ExecuteTime' },
        { name: '站址编码', value: 'SiteCode' },
        { name: '站址名称', value: 'SiteName' },
        { name: '状态', value: 'Status' }
      ]
      this.$refs.refModal.openModal(record,info,'/Data_Manage/Data_Wo_Son_Check/GetData_Wo_Son_Check')
    },
    httpRequest(option) {
      this.handleImport1(option, '/Data_Manage/Data_Wo_Son_Check/Data_Wo_Son_CheckInput')
    }
  }
}
</script>
