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
            <a-form-item label="是否超时：">
              <a-input placeholder="请输入是否超时：" v-model="queryParam.IsTimeOut"></a-input>
            </a-form-item>
          </a-col>
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            <a-button type="primary" @click="handleExportXls('移动传输工单')" icon="export" style="margin-left: 8px"
              >导出</a-button
            >
          </span>
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
          title: '工单号',
          align: 'center',
          dataIndex: 'WoNum'
        },
        {
          title: '工单标题',
          align: 'center',
          dataIndex: 'WoTitle'
        },
        {
          title: '设备维护单位',
          align: 'center',
          dataIndex: 'DWCompany'
        },
        {
          title: 'T1升级移交时间',
          align: 'center',
          dataIndex: 'HandleTime'
        },
        {
          title: '是否延期有效',
          align: 'center',
          dataIndex: 'IsValid'
        },
        {
          title: '是否超时',
          align: 'center',
          dataIndex: 'IsTimeOut'
        },
        {
          title: '告警对象',
          align: 'center',
          dataIndex: 'AlarmObject'
        },
        {
          title: '告警标准名',
          align: 'center',
          dataIndex: 'AlarmName'
        },
        {
          title: '当月已派发相同工单数',
          align: 'center',
          dataIndex: 'SameWo'
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
        list: '/Data_Manage/Data_Wo_Son_Transmission/GetData_Wo_Son_TransmissionList',
        exportXlsUrl: '/Data_Manage/Data_Wo_Son_Transmission/Data_Wo_Son_TransmissionExport'
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
        { name: '工单号', value: 'WoNum' },
        { name: '工单标题', value: 'WoTitle' },
        { name: '设备维护单位', value: 'DWCompany' },
        { name: 'T1升级移交时间', value: 'HandleTime' },
        { name: '是否延期有效', value: 'IsValid' },
        { name: '是否超时', value: 'IsTimeOut' },
        { name: '告警对象', value: 'AlarmObject' },
        { name: '告警标准名', value: 'AlarmName' },
        { name: '当月已派发相同工单数', value: 'SameWo' }
      ]
      this.$refs.refModal.openModal(record, info, '/Data_Manage/Data_Wo_Son_Transmission/GetData_Wo_Son_Transmission')
    }
  }
}
</script>
