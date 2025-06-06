import warehouse from 'warehouse';
import { join } from 'path';
import Moment from './types/moment';
import moment from 'moment';
import { full_url_for } from 'hexo-util';
import type Hexo from '../hexo';
import type { PageSchema } from '../types';

export = (ctx: Hexo) => {
  const Page = new warehouse.Schema<PageSchema>({
    title: {type: String, default: ''},
    date: {
      type: Moment,
      default: moment
    },
    updated: {
      type: Moment
    },
    comments: {type: Boolean, default: true},
    layout: {type: String, default: 'page'},
    _content: {type: String, default: ''},
    source: {type: String, required: true},
    path: {type: String, required: true},
    raw: {type: String, default: ''},
    content: {type: String},
    excerpt: {type: String},
    more: {type: String}
  });

  Page.virtual('permalink').get(function() {
    return full_url_for.call(ctx, this.path);
  });

  Page.virtual('full_source').get(function() {
    return join(ctx.source_dir, this.source || '');
  });

  return Page;
};
