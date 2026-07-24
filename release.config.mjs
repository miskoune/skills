// The stock preset renders no commit lines in this setup; this minimal partial
// lists each commit's subject with a link to the commit.
const commitPartial = `* {{#if scope}}**{{scope}}:** {{/if}}{{#if subject}}{{subject}}{{else}}{{header}}{{/if}}{{#if hash}} {{#if @root.linkReferences}}([{{shortHash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/{{@root.commit}}/{{hash}})){{else}}{{shortHash}}{{/if}}{{/if}}
`;

export default {
  tagFormat: 'v${version}',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'chore', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'build', release: 'patch' },
          { type: 'ci', release: 'patch' },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'perf', section: 'Performance' },
            { type: 'refactor', section: 'Refactoring' },
            { type: 'docs', section: 'Documentation' },
            { type: 'build', section: 'Build' },
            { type: 'ci', section: 'CI' },
            { type: 'chore', section: 'Chores' },
          ],
        },
        writerOpts: { commitPartial },
      },
    ],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
