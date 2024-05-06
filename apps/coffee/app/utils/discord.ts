interface Payload {
  content: string;
  embeds: Embed[];
}
interface Embed {
  fields: Field[];
}
interface Field {
  name: string;
  value: string;
  inline: boolean;
}

export class MessageBuilder {
  payload: any;

  constructor() {
    this.payload = {
      embeds: [{ fields: [] }],
    };
  }

  getJSON(): Payload {
    return this.payload;
  }

  setText(text: string): this {
    this.payload.content = text;

    return this;
  }

  setAuthor(author: string, authorImage: string, authorUrl: string): this {
    this.payload.embeds[0].author = {};
    this.payload.embeds[0].author.name = author;
    this.payload.embeds[0].author.url = authorUrl;
    this.payload.embeds[0].author.icon_url = authorImage;

    return this;
  }

  setTitle(title: string): this {
    this.payload.embeds[0].title = title;

    return this;
  }

  setURL(url: string): this {
    this.payload.embeds[0].url = url;

    return this;
  }

  setThumbnail(thumbnail: string): this {
    this.payload.embeds[0].thumbnail = {};
    this.payload.embeds[0].thumbnail.url = thumbnail;

    return this;
  }

  setImage(image: string): this {
    this.payload.embeds[0].image = {};
    this.payload.embeds[0].image.url = image;

    return this;
  }

  setTimestamp(date: Date): this {
    if (date) {
      this.payload.embeds[0].timestamp = date;
    } else {
      this.payload.embeds[0].timestamp = new Date();
    }

    return this;
  }

  setColor(color: string): this {
    this.payload.embeds[0].color = formatColor(color);

    return this;
  }

  setDescription(description: string): this {
    this.payload.embeds[0].description = description;

    return this;
  }

  addField(fieldName?: string, fieldValue?: string, inline?: boolean): this {
    this.payload.embeds[0].fields.push({
      name: fieldName,
      value: fieldValue,
      inline: inline,
    });

    return this;
  }

  setFooter(footer: string, footerImage: string): this {
    this.payload.embeds[0].footer = {};
    this.payload.embeds[0].footer.icon_url = footerImage;
    this.payload.embeds[0].footer.text = footer;

    return this;
  }
}

const formatColor = (color: string) => {
  if (color.startsWith("#")) {
    return parseInt(color.replace("#", ""), 16);
  }

  return parseInt(color, 16);
};

export const sendHook = async (url: string, payload: Payload) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res;
};
