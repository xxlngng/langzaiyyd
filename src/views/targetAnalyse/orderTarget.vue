<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="日期：">
              <a-date-picker style="width: 100%" v-model="queryParam.CreateTime" placeholder="请选择日期" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="工单类型：">
              <a-select style="width: 100%" v-model="queryParam.WoType" placeholder="请选择工单类型">
                <a-select-option value="全量工单">
                  全量工单
                </a-select-option>
                <a-select-option value="铁塔故障工单">
                  铁塔故障工单
                </a-select-option>
                <a-select-option value="铁塔巡检工单">
                  铁塔巡检工单
                </a-select-option>
                <a-select-option value="移动无线工单">
                  移动无线工单
                </a-select-option>
                <a-select-option value="移动网优工单">
                  移动网优工单
                </a-select-option>
                <a-select-option value="移动传输工单">
                  移动传输工单
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="地市：">
              <a-input placeholder="请输入地市" v-model="queryParam.City"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="区县：">
              <a-input placeholder="请输入区县" v-model="queryParam.County"></a-input>
            </a-form-item>
          </a-col>
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('工单指标')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
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
    </a-table>
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'

export default {
  mixins: [xlMixin],
  props: {},
  data() {
    return {
      columns: [
        {
          title: '机构',
          align: 'center',
          dataIndex: 'Organization'
        },
        {
          title: '工单总数',
          align: 'center',
          dataIndex: 'WoTatal'
        },
        {
          title: '工单处理数',
          align: 'center',
          dataIndex: 'HadDoNum'
        },
        {
          title: '工单处理率',
          align: 'center',
          dataIndex: 'Rate'
        }
      ],
      url: {
        list: '/Data_Manage/Data_Wo_Report/GetData_Wo_ReportList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Report/Data_Wo_ReportExport'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    detail(record) {
      const info = [
        { name: '机构', value: 'Organization' },
        { name: '工单总数', value: 'WoTatal' },
        { name: '工单处理数', value: 'HadDoNum' },
        { name: '工单处理率', value: 'Rate' }
      ]
      this.$refs.refModal.openModal(record, info, '/Data_Manage/Data_Wo_Report/GetTheData')
    }
  }
}
</script>
