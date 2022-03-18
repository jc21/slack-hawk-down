import { escapeForSlackWithMarkdown } from '../src/index.js'

describe('markdown', () => {
  describe('code multiline', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('```this is a code multiline```').should.equal('<code class="slack_code">this is a code multiline</code>')
    })

    it('should render an element formatted on multiple lines', () => {
      escapeForSlackWithMarkdown('```\nthis is a code multiline\n```').should.equal('<code class="slack_code">this is a code multiline</code>')
    })

    it('should greedily capture backticks', () => {
      escapeForSlackWithMarkdown('````this is a code multiline with backticks````').should.equal('<code class="slack_code">`this is a code multiline with backticks`</code>')
    })

    it('should not capture whitespace', () => {
      escapeForSlackWithMarkdown('```this is a code multiline``` ```and this is another```').should.equal('<code class="slack_code">this is a code multiline</code> <code class="slack_code">and this is another</code>')
    })

    it('should not apply markdown to text within a code block', () => {
      escapeForSlackWithMarkdown('```this is a code multiline with *asterisks*```').should.equal('<code class="slack_code">this is a code multiline with *asterisks*</code>')
    })

    it('should not affect markdown after the code block', () => {
      escapeForSlackWithMarkdown('```this is a code multiline``` with some *bold* text after it').should.equal('<code class="slack_code">this is a code multiline</code> with some <span class="slack_bold">bold</span> text after it')
    })
  })

  describe('code inline', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('`this is a code inline`').should.equal('<span class="slack_code">this is a code inline</span>')
    })
  })

  describe('bold', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('this is *bold*').should.equal('this is <span class="slack_bold">bold</span>')
    })

    it('should capture as much as possible', () => {
      escapeForSlackWithMarkdown('this is *bold*with*more*asterisks*').should.equal('this is <span class="slack_bold">bold*with*more*asterisks</span>')
    })
  })

  describe('italic', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('this is _italic_').should.equal('this is <span class="slack_italics">italic</span>')
    })
  })

  describe('strikethrough', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('this is ~struck~').should.equal('this is <span class="slack_strikethrough">struck</span>')
    })
  })

  describe('block quote', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('&gt;&gt;&gt;this is a block quote').should.equal('<div class="slack_block">this is a block quote</div>')
    })

    it('should replace newlines', () => {
      escapeForSlackWithMarkdown('&gt;&gt;&gt;this is a block quote\nwith newlines').should.equal('<div class="slack_block">this is a block quote<br>with newlines</div>')
    })
  })

  describe('inline quote', () => {
    it('should render an element', () => {
      escapeForSlackWithMarkdown('this is an &gt;inline quote').should.equal('this is an <span class="slack_block">inline quote</span>')
    })
  })
})
