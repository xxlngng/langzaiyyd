<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="hanldleAdd()">新建</a-button>
      <a-button
        type="primary"
        icon="minus"
        @click="handleDelete(selectedRowKeys)"
        :disabled="!hasSelected()"
        :loading="loading"
      >删除</a-button>
      <a-button type="primary" icon="redo" @click="getDataList()">刷新</a-button>
    </div>

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="10">
          <a-col :md="4" :sm="24">
            <a-form-item label="查询类别">
              <a-select allowClear v-model="queryParam.condition">
                <a-select-option key="CreaterId">创建人</a-select-option>
                <a-select-option key="UpdaterId">更新人</a-select-option>
                <a-select-option key="Remark">备注</a-select-option>
                <a-select-option key="WoParentId">基站Id</a-select-option>
                <a-select-option key="WoTitle">工单标题</a-select-option>
                <a-select-option key="DWCompany">代维单位</a-select-option>
                <a-select-option key="IsValid">是否延期有效</a-select-option>
                <a-select-option key="IsTimeOut">是否超时</a-select-option>
                <a-select-option key="AlarmObject">告警对象</a-select-option>
                <a-select-option key="AlarmName">告警名称</a-select-option>
                <a-select-option key="SameWo">当月已派发相同工单</a-select-option>
                <a-select-option key="ImpUrl">图片地址</a-select-option>
                <a-select-option key="FaultRemark">故障描述</a-select-option>
                <a-select-option key="WoStatus">工单状态</a-select-option>
                <a-select-option key="HandleMan">处理人</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-input v-model="queryParam.keyword" placeholder="关键字" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary" @click="() => {this.pagination.current = 1; this.getDataList()}">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      :columns="columns"
      :rowKey="row => row.Id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :bordered="true"
      size="small"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record.Id)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete([record.Id])">删除</a>
        </template>
      </span>
    </a-table>

    <edit-form ref="editForm" :parentObj="this"></edit-form>
  </a-card>
</template>

<script>
import EditForm from './EditForm'

const columns = [
  { title: '创建人', dataIndex: 'CreaterId', width: '10%' },
  { title: '更新时间', dataIndex: 'UpdateTime', width: '10%' },
  { title: '更新人', dataIndex: 'UpdaterId', width: '10%' },
  { title: '备注', dataIndex: 'Remark', width: '10%' },
  { title: '基站Id', dataIndex: 'WoParentId', width: '10%' },
  { title: '工单标题', dataIndex: 'WoTitle', width: '10%' },
  { title: '代维单位', dataIndex: 'DWCompany', width: '10%' },
  { title: '是否延期有效', dataIndex: 'IsValid', width: '10%' },
  { title: '是否超时', dataIndex: 'IsTimeOut', width: '10%' },
  { title: '告警对象', dataIndex: 'AlarmObject', width: '10%' },
  { title: '告警名称', dataIndex: 'AlarmName', width: '10%' },
  { title: '当月已派发相同工单', dataIndex: 'SameWo', width: '10%' },
  { title: '图片地址', dataIndex: 'ImpUrl', width: '10%' },
  { title: '故障描述', dataIndex: 'FaultRemark', width: '10%' },
  { title: '工单状态', dataIndex: 'WoStatus', width: '10%' },
  { title: '处理人', dataIndex: 'HandleMan', width: '10%' },
  { title: '处理时间', dataIndex: 'HandleTime', width: '10%' },
  { title: '归档时间', dataIndex: 'OverTime', width: '10%' },
  { title: '时限', dataIndex: 'TimeLimit', width: '10%' },
  { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
]

export default {
  components: {
    EditForm
  },
  mounted() {
    this.getDataList()
  },
  data() {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showTotal: (total, range) => `总数:${total} 当前:${range[0]}-${range[1]}`
      },
      filters: {},
      sorter: { field: 'Id', order: 'asc' },
      loading: false,
      columns,
      queryParam: {},
      selectedRowKeys: []
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.pagination = { ...pagination }
      this.filters = { ...filters }
      this.sorter = { ...sorter }
      this.getDataList()
    },
    getDataList() {
      this.selectedRowKeys = []

      this.loading = true
      this.$http
        .post('/Data_Manage/Data_Wo_Son_Transmission/GetDataList', {
          PageIndex: this.pagination.current,
          PageRows: this.pagination.pageSize,
          SortField: this.sorter.field || 'Id',
          SortType: this.sorter.order,
          Search: this.queryParam,
          ...this.filters
        })
        .then(resJson => {
          this.loading = false
          this.data = resJson.Data
          const pagination = { ...this.pagination }
          pagination.total = resJson.Total
          this.pagination = pagination
        })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    hanldleAdd() {
      this.$refs.editForm.openForm()
    },
    handleEdit(id) {
      this.$refs.editForm.openForm(id)
    },
    handleDelete(ids) {
      var thisObj = this
      this.$confirm({
        title: '确认删除吗?',
        onOk() {
          return new Promise((resolve, reject) => {
            thisObj.$http.post('/Data_Manage/Data_Wo_Son_Transmission/DeleteData', ids).then(resJson => {
              resolve()

              if (resJson.Success) {
                thisObj.$message.success('操作成功!')

                thisObj.getDataList()
              } else {
                thisObj.$message.error(resJson.Msg)
              }
            })
          })
        }
      })
    }
  }
}
</script>