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
            <a-form-item label="小区名：">
              <a-input placeholder="请输入小区名：" v-model="queryParam.AreaName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8">
            <a-form-item label="基站名：">
              <a-input placeholder="请输入基站名" v-model="queryParam.SiteName"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="10" :sm="10"> -->
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('移动无线工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
            <a-button
              type="primary"
              @click="handleExportXls2('http://ecds.rjtx.net/Upload/downFileModel/wuxian_input_model.xlsx')"
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
          title: '告警名称',
          align: 'center',
          dataIndex: 'AlarmName'
        },
        {
          title: '小区名',
          align: 'center',
          dataIndex: 'AreaName'
        },
        {
          title: '基站名',
          align: 'center',
          dataIndex: 'SiteName'
        },
        {
          title: '派单时间',
          align: 'center',
          dataIndex: 'SendTime',
          customRender(t) {
            return t&&moment(t).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '受理专业',
          align: 'center',
          dataIndex: 'HandleMajor'
        },
        {
          title: '恢复时间',
          align: 'center',
          dataIndex: 'RecoveryTime',
          customRender(t) {
            return t&&moment(t).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '最新回复内容',
          align: 'center',
          dataIndex: 'LatestMsg'
        },
        {
          title: '优化片区',
          align: 'center',
          dataIndex: 'OptimizeArea'
        },
        {
          title: '网格组长',
          align: 'center',
          dataIndex: 'GridLeader'
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
        list: '/Data_Manage/Data_Wo_Son_WuXian/GetData_Wo_Son_WuXianList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Son_WuXian/Data_Wo_Son_WuXianExport'
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
        { name: '告警名称', value: 'AlarmName' },
        { name: '小区名', value: 'AreaName' },
        { name: '基站名', value: 'SiteName' },
        { name: '派单时间', value: 'SendTime' },
        { name: '受理专业', value: 'HandleMajor' },
        { name: '恢复时间', value: 'RecoveryTime' },
        { name: '最新回复内容', value: 'LatestMsg' },
        { name: '优化片区', value: 'OptimizeArea' },
        { name: '网格组长', value: 'GridLeader' },
      ]
      this.$refs.refModal.openModal(record,info,'/Data_Manage/Data_Wo_Son_WuXian/GetData_Wo_Son_WuXian')
    },
    httpRequest(option) {
      this.handleImport1(option, '/Data_Manage/Data_Wo_Son_WuXian/Data_Wo_Son_WuXianInput')
    }
  }
}
</script>
