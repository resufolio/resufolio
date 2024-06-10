import React from 'react'

interface MetaTagBase {
  content: string
}

interface MetaPropertyTag extends MetaTagBase{
  property: 'og:title' | 'og:description'
  | 'og:image' | 'og:url' | 'og:type'
  | 'og:site_name' | 'og:locale' | 'og:locale:alternate'
  | 'og:video' | 'og:audio' | 'og:determiner'
  | 'og:email' | 'og:phone_number' | 'og:fax_number'
  | 'og:country_name' | 'og:ttl'
  | 'og:section' | 'og:tag' | 'og:article:published_time'
  | 'og:article:modified_time' | 'og:article:expiration_time'
  | 'og:article:author' | 'og:book:isbn' | 'og:book:release_date'
  | 'og:book:author' | 'og:book:tag' | 'og:profile:first_name'
  | 'og:profile:last_name' | 'og:profile:username'
  | 'og:profile'
}

interface MetaNameTag extends MetaTagBase {
  name: 'description' | 'keywords' | 'author' | 'robots' | 'viewport' | 'application-name' | 'msapplication-TileColor' | 'msapplication-TileImage' | 'theme-color' | 'twitter:card' | 'twitter:site' | 'twitter:creator' | 'twitter:title' | 'twitter:description' | 'twitter:image' | 'twitter:image:alt' | 'twitter:player' | 'twitter:player:width' | 'twitter:player:height' | 'twitter:player:stream' | 'twitter:app:name:iphone' | 'twitter:app:id:iphone' | 'twitter:app:url:iphone' | 'twitter:app:name:ipad' | 'twitter:app:id:ipad' | 'twitter:app:url:ipad' | 'twitter:app:name:googleplay' | 'twitter:app:id:googleplay' | 'twitter:app:url:googleplay' | 'twitter:label1' | 'twitter:data1' | 'twitter:label2' | 'twitter:data2' | 'twitter:site' | 'twitter:creator' | 'twitter:domain' | 'twitter:app:name:iphone' | 'twitter:app:id:iphone' | 'twitter:app:url:iphone' | 'twitter:app:name:ipad' | 'twitter:app:id:ipad' | 'twitter:app:url:ipad' | 'twitter:app:name:googleplay' | 'twitter:app:id:googleplay' | 'twitter:app:url:googleplay' | 'twitter:app:country' | 'twitter:app:iphone:country' | 'twitter:app:ipad:country' | 'twitter:app:googleplay:country' | 'twitter:app:iphone:url' | 'twitter:app:ipad:url' | 'twitter:app:googleplay:url' | 'twitter:app:iphone:name' | 'twitter:app:ipad:name' | 'twitter:app:googleplay:name' | 'twitter:app:iphone:id' | 'twitter:app:ipad:id' | 'twitter:app:googleplay:id' | 'twitter:app:iphone:label' | 'twitter:app:ipad:label' | 'twitter:app:googleplay:label' | 'twitter:app:iphone:custom'
}

type MetaTag = MetaPropertyTag | MetaNameTag & { content: string }

export interface MetadataProps {
  title?: string;
  charset?: string;
  meta?: MetaTag[]
}

const MetadataComponent: React.FC<MetadataProps> = ({ title, meta }) => {
  return (
    <React.Fragment>
      {title && <title>{String(title)}</title>}
      {meta && meta.map((metaTag, index) => (
        <meta key={index} {...metaTag} />
      ))}
    </React.Fragment>
  )
}

export default MetadataComponent

