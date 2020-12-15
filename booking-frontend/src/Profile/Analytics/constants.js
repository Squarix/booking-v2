export const CHART_TITLE = {
  topViews: 'Most viewed apartments',
  topQueries: 'Most popular search queries',
  topDate: 'Most viewed booking dates apartments'
}

export const CHART_LABEL = {
  topViews: 'roomId',
  topQueries: 'query',
  topDate: 'roomId'
}

export const getChartLabelKey = id => CHART_LABEL[id];
export const getChartTitle = id => CHART_TITLE[id];
