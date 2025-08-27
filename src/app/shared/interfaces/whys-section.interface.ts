import { WhyBlock } from '@interface/why-block.interface';
import { FeatureItem } from '@interface/feature-item.interface';

export interface WhysSection {
  title: string;
  whyBlocks: WhyBlock[];
  features: FeatureItem[];
}
