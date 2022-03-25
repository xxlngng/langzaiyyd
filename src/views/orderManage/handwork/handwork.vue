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
            <a-form-item label="网格：">
              <a-input placeholder="请输入网格：" v-model="queryParam.Grid"></a-input>
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
            <a-button type="primary" @click="handleExportXls('人工临时工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
            <a-button
              type="primary"
              @click="handleExportXls2('http://ecds.rjtx.net/Upload/downFileModel/site_config_input_model.xlsx')"
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
          title: '站址名称',
          align: 'center',
          dataIndex: 'SiteName'
        },
        {
          title: '站址编码',
          align: 'center',
          dataIndex: 'SiteCode'
        },
        {
          title: '故障/任务原因',
          align: 'center',
          dataIndex: 'FaultInfo'
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
          title: '班组',
          align: 'center',
          dataIndex: 'TeamName'
        },
        {
          title: '人员',
          align: 'center',
          dataIndex: 'HandleMan'
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
        list: '/Data_Manage/Data_Wo_Son_Temp/GetData_Wo_Son_TempList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Son_Temp/Data_Wo_Son_TempExport'
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
        { name: '站址名称', value: 'SiteName' },
        { name: '站址编码', value: 'SiteCode' },
        { name: '故障/任务原因', value: 'FaultInfo' },
        { name: '区县', value: 'County' },
        { name: '网格', value: 'Grid' },
        { name: '班组', value: 'TeamName' },
        { name: '人员', value: 'HandleMan' }
      ]
      this.$refs.refModal.openModal(record, info, '/Data_Manage/Data_Wo_Son_Temp/GetData_Wo_Son_Temp')
    },
    httpRequest(option) {
      this.handleImport1(option, '/Data_Manage/Data_Wo_Son_Temp/Data_Wo_Son_TempInput')
    }
  }
}
</script>
