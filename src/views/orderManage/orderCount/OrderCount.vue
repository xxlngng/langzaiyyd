<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="区县：">
              <a-input placeholder="请输入区县" v-model="queryParam.City"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="网格：">
              <a-input placeholder="请输入网格" v-model="queryParam.Grid"></a-input>
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
          <a-col :md="10" :sm="10">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
              <a-button type="primary" @click="handleExportXls('工单统计')" icon="export" style="margin-left: 8px">导出</a-button>
            </span>
          </a-col>
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
      <!-- 字符串超长截取省略号显示-->
      <span slot="description" slot-scope="text">
        <j-ellipsis :value="text" :length="30" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="edit(record)">编辑</a>
      </span>
    </a-table>

    <!-- <DatasourceModal ref="datasourceModal" @loadData="loadData" /> -->
  </a-card>
</template>

<script>
import { xlMixin } from '@/mixins/xlMixin'

export default {
  mixins: [xlMixin],
  components: {},
  props: {},
  data() {
    return {
      columns: [
        {
          title: '区县',
          align: 'center',
          dataIndex: 'County'
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
          title: '网格',
          align: 'center',
          dataIndex: 'Grid',
        },
        {
          title: '班组人员',
          align: 'center',
          dataIndex: 'TeamName'
        },
        {
          title: '故障原因',
          align: 'center',
          dataIndex: 'FaultCause'
        },
        {
          title: '权重值',
          align: 'center',
          dataIndex: 'Weight'
        },
        {
          title: '故障数量',
          align: 'center',
          dataIndex: 'FaultNum'
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   width: 180,
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      url: {
        list: '/Data_Manage/Data_Wo/GetData_WoList',
exportXlsUrl: '/Data_Manage/Data_Wo/Data_WoExport'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    edit(record) {
      this.$refs.datasourceModal.edit(record)
    },
    add() {
      this.$refs.datasourceModal.showModal()
    }
  }
}
</script>
